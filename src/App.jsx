import React, { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleDownload = () => {
    const content = `@echo off
                      net session >nul 2>&1
                      if %errorLevel% neq 0 (
                          powershell -Command "Start-Process '%~f0' -Verb RunAs"
                          exit /b
                      )

                      sc config w32time start= auto
                      net start w32time

                      if not exist D:\synctime mkdir D:\synctime
                      (
                      echo try {
                      echo    Start-Service w32time -ErrorAction SilentlyContinue
                      echo    w32tm /resync /nowait ^>^> "D:\synctime\sync-log.txt" 2^>^&1
                      echo    echo "Sync done at $^(Get-Date^)" ^>^> "D:\synctime\sync-log.txt"
                      echo } catch {
                      echo    echo "Failed at $^(Get-Date^)" ^>^> "D:\synctime\sync-log.txt"
                      echo }
                      ) > "D:\synctime\sync-time.ps1"

                      schtasks /Create /TN "MyTimeSyncAtStartup" ^
                      /TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -File \"D:\synctime\sync-time.ps1\"" ^
                      /SC ONSTART /RL HIGHEST /RU SYSTEM /F

                      echo Hoan tat cai dat dong bo thoi gian
                      pause`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "setup-sync-time.bat";
    a.click();

    URL.revokeObjectURL(url);
  };

  function handleDownload2() {
  const link = document.createElement('a');
  link.href =
    'https://github.com/truongnx2601/backupbrowser/releases/latest/download/BackupBrowser.exe';
  link.download = 'BackupBrowser.exe';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  };

  function handleDownload3() {
  const link = document.createElement('a');
  link.href =
    'https://github.com/truongnx2601/sitemanager/releases/download/v1.0.0/Site.exe';
  link.download = 'Site.exe';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  };

  const handleDownload4 = () => {
  const content = String.raw`@echo off
setlocal enabledelayedexpansion

:: =========================================================
::  VNVC - Local Network Access Policy (Chrome + Edge)
:: =========================================================

:: Kiểm tra quyền admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Dang yeu cau quyen Administrator...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

set "LOGFILE=D:\setting_chrome.log"
echo ==================================================>>"%LOGFILE%"
echo [START] %date% %time% >>"%LOGFILE%"

echo [+] Dang ap dung chinh sach Local Network Access...>>"%LOGFILE%"

:: =========================================================
:: Ghi registry cho Google Chrome
:: =========================================================
reg delete "HKLM\SOFTWARE\Policies\Google\Chrome\LocalNetworkAccessAllowedForUrls" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\LocalNetworkAccessAllowedForUrls" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\LocalNetworkAccessAllowedForUrls" /v "1" /t REG_SZ /d "https://tiemchung.vnvc.info" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\LocalNetworkAccessAllowedForUrls" /v "2" /t REG_SZ /d "https://it-genie.vnvc.info" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\LocalNetworkAccessAllowedForUrls" /v "3" /t REG_SZ /d "https://test-pm.vnvc.info" /f

:: =========================================================
:: Ghi registry cho Microsoft Edge
:: =========================================================
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Edge\LocalNetworkAccessAllowedForUrls" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge\LocalNetworkAccessAllowedForUrls" /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge\LocalNetworkAccessAllowedForUrls" /v "1" /t REG_SZ /d "https://tiemchung.vnvc.info" /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge\LocalNetworkAccessAllowedForUrls" /v "2" /t REG_SZ /d "https://it-genie.vnvc.info" /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge\LocalNetworkAccessAllowedForUrls" /v "3" /t REG_SZ /d "https://test-pm.vnvc.info" /f

echo [OK] Registry entries applied successfully.>>"%LOGFILE%"

echo Checking Google Chrome version...>>"%LOGFILE%"
echo.>>"%LOGFILE%"

echo [DONE]
echo [END] %date% %time% >>"%LOGFILE%"
exit /b
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "config-chrome.bat";
  a.click();
  URL.revokeObjectURL(url);
};

function handleDownload5() {
  const link = document.createElement('a');
  link.href =
    'https://github.com/truongnx2601/dalitsoft/releases/download/v25.10.2/ZaloSetup-25-10-2.exe';
  link.download = 'Zalo-pc-25-10-2.exe';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function handleDownload6() {
  const link = document.createElement('a');
  link.href =
    'https://github.com/truongnx2601/backupdatalog/releases/download/v1.0.0/VNVC.-.Datalog.zip';
  link.download = 'datalog-app.exe';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function handleDownload7() {
  const link = document.createElement('a');
  link.href =
    'https://github.com/truongnx2601/hstc/releases/download/latest/HoSoTiemChung.ver6.rar';
  link.download = 'hstc.exe';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleDownload8 = () => {
  const content = String.raw`@echo off
setlocal

set APP_NAME=webapp.exe
set APP_PATH=D:\Rajah\webapp.exe

net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

tasklist | find /i "%APP_NAME%" >nul
if %errorlevel%==0 (
    taskkill /f /im "%APP_NAME%" >nul 2>&1
    timeout /t 2 >nul
)

start "" "%APP_PATH%"

exit /b
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "update-rajah.bat";
  a.click();
  URL.revokeObjectURL(url);
};

const handleDownload9 = () => {
  const token = "bTFsckNaMEJ4eFdGX2lmQVBfM2Q6bWFyRGRhVEh1cHQwUXVkeGwzci1sZw==";

  const ps1Content = String.raw`
# -----------------------------------------------------------------
# SELF-ELEVATION
# -----------------------------------------------------------------
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File \`"$PSCommandPath\`"" -Verb RunAs
    exit
}

# CONFIG
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ProgressPreference = 'SilentlyContinue'

$version = "9.3.2"
$arch = "windows-x86_64"
$filename = "elastic-agent-$version-$arch.zip"
$url = "https://artifacts.elastic.co/downloads/beats/elastic-agent/$filename"
$tempPath = "$env:TEMP\elastic-agent-setup"
$fleetUrl = "https://fleet.vnvc.info:10443"

# TOKEN
$enrollmentToken = "${token}"

Write-Host "[+] Using predefined token..." -ForegroundColor Green

try {
    if (Test-Path $tempPath) { Remove-Item -Path $tempPath -Recurse -Force }
    New-Item -ItemType Directory -Path $tempPath | Out-Null

    Invoke-WebRequest -Uri $url -OutFile "$tempPath\$filename" -ErrorAction Stop

    Expand-Archive -Path "$tempPath\$filename" -DestinationPath $tempPath -Force

    $installDir = Get-ChildItem -Path $tempPath -Directory | Select-Object -First 1
    if ($null -eq $installDir) { throw "Extraction failed." }

    Push-Location $installDir.FullName

    .\elastic-agent.exe install \`
      --url=$fleetUrl \`
      --enrollment-token=$enrollmentToken \`
      --non-interactive \`
      --insecure

    Pop-Location

    Start-Sleep -Seconds 20

    $agentExe = "C:\Program Files\Elastic\Agent\elastic-agent.exe"
    if (Test-Path $agentExe) {
        & $agentExe status
    }

    Remove-Item -Path $tempPath -Recurse -Force -ErrorAction SilentlyContinue

    Write-Host "[SUCCESS] Done" -ForegroundColor Green
}
catch {
    Write-Host "[FAILED] $($_.Exception.Message)" -ForegroundColor Red
}

Read-Host "Press Enter to exit..."
`;

  const cmdContent = `@echo off
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0install.ps1"
pause
`;

  // download ps1
  const ps1Blob = new Blob([ps1Content], { type: "text/plain" });
  const ps1Url = URL.createObjectURL(ps1Blob);
  const ps1Link = document.createElement("a");
  ps1Link.href = ps1Url;
  ps1Link.download = "install.ps1";
  ps1Link.click();

  // download cmd
  const cmdBlob = new Blob([cmdContent], { type: "text/plain" });
  const cmdUrl = URL.createObjectURL(cmdBlob);
  const cmdLink = document.createElement("a");
  cmdLink.href = cmdUrl;
  cmdLink.download = "run.cmd";
  cmdLink.click();

  URL.revokeObjectURL(ps1Url);
  URL.revokeObjectURL(cmdUrl);
};

const handleDownload10 = () => {
  const token = "ZXF4dENaMEJXLV90OVUxSGRRaHc6QzFvNEdNQ2NlaUNwVVk0UXJZaDNfdw==";

  const ps1Content = String.raw`
# -----------------------------------------------------------------
# SELF-ELEVATION
# -----------------------------------------------------------------
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File \`"$PSCommandPath\`"" -Verb RunAs
    exit
}

# CONFIG
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ProgressPreference = 'SilentlyContinue'

$version = "9.3.2"
$arch = "windows-x86_64"
$filename = "elastic-agent-$version-$arch.zip"
$url = "https://artifacts.elastic.co/downloads/beats/elastic-agent/$filename"
$tempPath = "$env:TEMP\elastic-agent-setup"
$fleetUrl = "https://fleet.vnvc.info:10443"

# TOKEN
$enrollmentToken = "${token}"

Write-Host "[+] Using predefined token..." -ForegroundColor Green

try {
    if (Test-Path $tempPath) { Remove-Item -Path $tempPath -Recurse -Force }
    New-Item -ItemType Directory -Path $tempPath | Out-Null

    Invoke-WebRequest -Uri $url -OutFile "$tempPath\$filename" -ErrorAction Stop

    Expand-Archive -Path "$tempPath\$filename" -DestinationPath $tempPath -Force

    $installDir = Get-ChildItem -Path $tempPath -Directory | Select-Object -First 1
    if ($null -eq $installDir) { throw "Extraction failed." }

    Push-Location $installDir.FullName

    .\elastic-agent.exe install \`
      --url=$fleetUrl \`
      --enrollment-token=$enrollmentToken \`
      --non-interactive \`
      --insecure

    Pop-Location

    Start-Sleep -Seconds 20

    $agentExe = "C:\Program Files\Elastic\Agent\elastic-agent.exe"
    if (Test-Path $agentExe) {
        & $agentExe status
    }

    Remove-Item -Path $tempPath -Recurse -Force -ErrorAction SilentlyContinue

    Write-Host "[SUCCESS] Done" -ForegroundColor Green
}
catch {
    Write-Host "[FAILED] $($_.Exception.Message)" -ForegroundColor Red
}

Read-Host "Press Enter to exit..."
`;

  const cmdContent = `@echo off
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0install.ps1"
pause
`;

  // download ps1
  const ps1Blob = new Blob([ps1Content], { type: "text/plain" });
  const ps1Url = URL.createObjectURL(ps1Blob);
  const ps1Link = document.createElement("a");
  ps1Link.href = ps1Url;
  ps1Link.download = "install.ps1";
  ps1Link.click();

  // download cmd
  const cmdBlob = new Blob([cmdContent], { type: "text/plain" });
  const cmdUrl = URL.createObjectURL(cmdBlob);
  const cmdLink = document.createElement("a");
  cmdLink.href = cmdUrl;
  cmdLink.download = "run.cmd";
  cmdLink.click();

  URL.revokeObjectURL(ps1Url);
  URL.revokeObjectURL(cmdUrl);
};

const handleDownload11 = () => {
    const content = `@echo off

                      net session >nul 2>&1
                      if %errorLevel% neq 0 (
                          echo Checking Admin...
                          powershell -Command "Start-Process cmd -ArgumentList '/c ""%~f0""' -Verb RunAs"
                          exit
                      )

                      title Config Zalo
                      color 0A

                      set "ZALO_PATH1=%LOCALAPPDATA%\Programs\Zalo"
                      set "ZALO_PATH2=%LOCALAPPDATA%\Zalo"
                      set "ZALO_PATH3=%LOCALAPPDATA%\zalo-updater"

                      :MENU
                      cls
                      echo ==============================
                      echo   CONFIG ZALO PC
                      echo ==============================
                      echo 1. Disable Zalo
                      echo 2. Enable Zalo
                      echo 0. Exit
                      echo ==============================
                      set /p choice=Choose:

                      if "%choice%"=="1" goto BLOCK
                      if "%choice%"=="2" goto UNBLOCK
                      if "%choice%"=="0" exit
                      goto MENU

                      :BLOCK
                      echo.
                      echo Disabling Zalo...

                      call :LOCK "%ZALO_PATH1%"
                      call :LOCK "%ZALO_PATH2%"
                      call :LOCK "%ZALO_PATH3%"

                      echo.
                      echo Disable Zalo success!
                      pause
                      goto MENU

                      :UNBLOCK
                      echo.
                      echo Enabling Zalo...

                      call :UNLOCK "%ZALO_PATH1%"
                      call :UNLOCK "%ZALO_PATH2%"
                      call :UNLOCK "%ZALO_PATH3%"

                      echo.
                      echo Enable Zalo success!
                      pause
                      goto MENU

                      :LOCK
                      echo Locking %~1
                      mkdir "%~1" 2>nul

                      takeown /f "%~1" /r /d y >nul 2>&1

                      icacls "%~1" /inheritance:r >nul

                      :: Chặn toàn bộ Users
                      icacls "%~1" /deny Users:(OI)(CI)(F) >nul

                      goto :eof

                      :UNLOCK
                      echo Unlocking %~1

                      takeown /f "%~1" /r /d y >nul 2>&1

                      icacls "%~1" /remove:d Users >nul
                      icacls "%~1" /grant Users:(OI)(CI)(F) >nul

                      goto :eof
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ConfigZalo.bat";
    a.click();

    URL.revokeObjectURL(url);
  };

  function handleDownload12() {
    const link = document.createElement('a');
    link.href =
      'https://github.com/truongnx2601/windowchecker/releases/download/v1.0.0/WindowsLicenseChecker.exe';
    link.download = 'WindowsLicenseCheker.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function handleDownload13() {
    const link = document.createElement('a');
    link.href =
      'https://github.com/truongnx2601/o365/releases/download/v1.0.0/OfficeSetup.exe';
    link.download = 'Office365.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload14 = () => {
    const content = `@echo off
                      title Get OEM Windows Key

                      echo ================================
                      echo   GET WINDOWS OEM KEY FROM BIOS
                      echo ================================
                      echo.

                      for /f "tokens=2 delims==" %%i in ('wmic path softwarelicensingservice get OA3xOriginalProductKey /value ^| find "="') do set key=%%i

                      if defined key (
                          echo OEM Key cua ban la:
                          echo.
                          echo %key%
                      ) else (
                          echo Khong tim thay OEM key trong BIOS.
                      )

                      echo.
                      pause`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "OEM-key.bat";
    a.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file đồng bộ thời gian
      </button>
      <button
        onClick={handleDownload2}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file backup browser
      </button>
      <button
        onClick={handleDownload3}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file Site Manager
      </button>
      <button
        onClick={handleDownload4}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file Config Chrome
      </button>
      <button
        onClick={handleDownload5}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file ZaloPC 25.10.2
      </button>
      <button
        onClick={handleDownload6}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file datalog app
      </button>
      <button
        onClick={handleDownload7}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file hstc
      </button>
      <button
        onClick={handleDownload8}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file update Rajah
      </button>
      <button
        onClick={handleDownload9}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file Eclastic Agent HCM1
      </button>
      <button
        onClick={handleDownload10}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file Eclastic Agent HCM2
      </button>
      <button
        onClick={handleDownload11}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file Config ZaloPC
      </button>
      <button
        onClick={handleDownload12}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file Windows Lic check
      </button>
      <button
        onClick={handleDownload13}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file O365
      </button>
      <button
        onClick={handleDownload14}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file lấy OEM key
      </button>
    </div>
  );
}

export default App;
