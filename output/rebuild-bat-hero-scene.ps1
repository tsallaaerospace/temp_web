param([Parameter(Mandatory=$true)][string]$Ffmpeg)
$ErrorActionPreference = 'Stop'
$assetRoot = 'E:/Tsalla Website/frontend/public/product/T-BAT'
$original = Join-Path $assetRoot 'bat-hero-scrub.mp4'
$replacement = Join-Path $assetRoot 'hf_20261110_120408_0e1086a6-6ffc-4290-815c-08b6334a8cd4.mp4'
# Original close-up is frames 315..435. Replacement has 97 frames; following scene begins at 412.
$edit = '[0:v]split=2[before][after];[before]trim=end_frame=315,setpts=PTS-STARTPTS[a];[1:v]fps=24,scale=1920:1080:flags=lanczos,setsar=1,setpts=PTS-STARTPTS[b];[after]trim=start_frame=436,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[v]'
& $Ffmpeg -hide_banner -loglevel error -i $original -i $replacement -filter_complex $edit -map '[v]' -an -c:v libx264 -preset fast -crf 18 -g 4 -keyint_min 4 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart -y (Join-Path $assetRoot 'bat-hero-scrub-20261110.mp4')
if ($LASTEXITCODE -ne 0) { throw 'Scroll video render failed' }
& $Ffmpeg -hide_banner -loglevel error -i (Join-Path $assetRoot 'bat-hero-scrub-20261110.mp4') -vf 'scale=1280:720:flags=lanczos' -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart -y (Join-Path $assetRoot 'bat-hero-scenes-20261110.mp4')
if ($LASTEXITCODE -ne 0) { throw 'Mobile video render failed' }
Write-Output 'Built desktop scrub and mobile playback videos.'
