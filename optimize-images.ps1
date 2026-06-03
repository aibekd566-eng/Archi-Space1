param(
    [int]$MaxWidth = 1600,
    [int]$MaxHeight = 1600,
    [int]$Quality = 82
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backupRoot = Join-Path $root "_image-backup-before-optimization"

Add-Type -AssemblyName System.Drawing

function Save-Jpeg {
    param(
        [System.Drawing.Image]$Image,
        [string]$Path,
        [int]$Quality
    )

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$Quality)
    $Image.Save($Path, $codec, $params)
    $params.Dispose()
}

function Optimize-Image {
    param([System.IO.FileInfo]$File)

    $relative = $File.FullName.Substring($root.Length).TrimStart('\', '/')
    $backup = Join-Path $backupRoot $relative
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backup) | Out-Null

    if (-not (Test-Path -LiteralPath $backup)) {
        Copy-Item -LiteralPath $File.FullName -Destination $backup -Force
    }

    $temp = [System.IO.Path]::ChangeExtension([System.IO.Path]::GetTempFileName(), ".jpg")
    $targetWidth = 0
    $targetHeight = 0
    $source = [System.Drawing.Image]::FromFile($File.FullName)
    try {
        $ratio = [Math]::Min($MaxWidth / $source.Width, $MaxHeight / $source.Height)
        if ($ratio -gt 1) { $ratio = 1 }

        $targetWidth = [Math]::Max(1, [int][Math]::Round($source.Width * $ratio))
        $targetHeight = [Math]::Max(1, [int][Math]::Round($source.Height * $ratio))

        $bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.DrawImage($source, 0, 0, $targetWidth, $targetHeight)
            }
            finally {
                $graphics.Dispose()
            }

            Save-Jpeg -Image $bitmap -Path $temp -Quality $Quality
        }
        finally {
            $bitmap.Dispose()
        }
    }
    finally {
        $source.Dispose()
    }

    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()

    if ((Get-Item -LiteralPath $temp).Length -lt $File.Length) {
        Copy-Item -LiteralPath $temp -Destination $File.FullName -Force
        Remove-Item -LiteralPath $temp -Force
        $newSize = [Math]::Round((Get-Item -LiteralPath $File.FullName).Length / 1KB, 1)
        Write-Output "Optimized $relative -> ${targetWidth}x${targetHeight}, ${newSize} KB"
    }
    else {
        Remove-Item -LiteralPath $temp -Force
        Write-Output "Kept $relative"
    }
}

$targets = @(
    (Join-Path $root "images"),
    (Join-Path $root "portfolio")
)

foreach ($target in $targets) {
    Get-ChildItem -LiteralPath $target -Recurse -File -Include *.jpg, *.jpeg |
        Where-Object { $_.Length -gt 300KB } |
        ForEach-Object { Optimize-Image $_ }
}

Write-Output "Done. Original images are backed up in $backupRoot"
