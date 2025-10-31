import React from "react";

function App() {
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

echo ===============================================
echo   GOOGLE CHROME AUTO CHECK & UPDATE
echo ===============================================
echo.

set "CHROME_PATH=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "EDGE_PATH=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"

if not exist "%CHROME_PATH%" (
    echo Chrome not found!
    echo [ERROR] Chrome not found! >>"%LOGFILE%"
    echo.>>"%LOGFILE%"
    goto END
)

for /f "tokens=2 delims==" %%A in ('wmic datafile where name^="%CHROME_PATH:\=\\%" get Version /value 2^>nul') do set CURRENT_VERSION=%%A
for /f "tokens=1 delims=." %%a in ("%CURRENT_VERSION%") do set CUR_MAJOR=%%a
echo Current Chrome version: %CURRENT_VERSION%
echo Current major: %CUR_MAJOR%
echo Current version: %CURRENT_VERSION% >>"%LOGFILE%"
echo Current major: %CUR_MAJOR% >>"%LOGFILE%"
echo.

echo Checking latest version from Google... >>"%LOGFILE%"
set "LATEST="

for /f "tokens=2 delims=:," %%A in ('
    curl -s https://versionhistory.googleapis.com/v1/chrome/platforms/win64/channels/stable/versions ^
    ^| findstr /r /c:"\"version\"" 
') do (
    if not defined LATEST (
        set "LATEST=%%~A"
    )
)

set "LATEST=%LATEST:"=%"
set "LATEST=%LATEST: =%"
set "LATEST=%LATEST:,=%"
set "LATEST=%LATEST:{=%"
set "LATEST=%LATEST:}=%"

for /f "tokens=1 delims=." %%a in ("%LATEST%") do set LATEST_MAJOR=%%a

echo Latest Chrome version: %LATEST%
echo Latest major: %LATEST_MAJOR%
echo Latest version: %LATEST% >>"%LOGFILE%"
echo Latest major: %LATEST_MAJOR% >>"%LOGFILE%"
echo.

if "!CUR_MAJOR!"=="!LATEST_MAJOR!" (
    echo Chrome is up to date.
    echo [INFO] Chrome is already the latest major version. >>"%LOGFILE%"
    echo.>>"%LOGFILE%"
    goto END
)

echo Running Chrome update...
:: =========================
:: Settings
:: =========================
set "MSI_URL=https://dl.google.com/dl/chrome/install/GoogleChromeStandaloneEnterprise64.msi"
set "MSI_PATH=%USERPROFILE%\Downloads\Chrome.msi"
set "INSTALL_LOG=D:\chrome_install.log"

:: =========================
:: Start Chrome MSI download & install in background
:: =========================
echo [INFO] Starting Chrome MSI download and silent install... >>"%LOGFILE%"
powershell -Command "Start-Job { Invoke-WebRequest -Uri '%MSI_URL%' -OutFile '%MSI_PATH%'; Start-Process msiexec.exe -ArgumentList '/i','%MSI_PATH%','/qn','/norestart','/L*v','%INSTALL_LOG%' -Wait }"

echo [INFO] Chrome install job started in background. Other script steps continue... >>"%LOGFILE%"

:: Wait a few seconds for job to start
timeout /t 5 >nul

echo [+] Reloading policies for Chrome and Edge...
if exist "%CHROME_PATH%" (
    start "" "%CHROME_PATH%" --policy-refresh
)
if exist "%EDGE_PATH%" (
    start "" "%EDGE_PATH%" --policy-refresh
)

:: =========================
:: Wait for Chrome MSI install job to finish (optional)
:: =========================
echo [INFO] Waiting for Chrome install job to finish...
powershell -Command "Get-Job | Wait-Job | Receive-Job"

echo [INFO] Chrome install completed. >>"%LOGFILE%"

:: =========================
:: End log
:: =========================
echo.

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
    </div>
  );
}

export default App;
