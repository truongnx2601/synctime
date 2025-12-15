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
    </div>
  );
}

export default App;
