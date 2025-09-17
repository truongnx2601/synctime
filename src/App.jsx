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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tải file đồng bộ thời gian
      </button>
    </div>
  );
}

export default App;
