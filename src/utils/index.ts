export function convertSrtToVttFile(srtFile: File): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!srtFile) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const srtContent = e.target?.result as string;
        const vttContent = convertSrtToVttsContent(srtContent);

        // Create a Blob with the VTT content
        const blob = new Blob([vttContent], { type: "text/vtt" });

        // Create a File from Blob
        const vttFile = new File(
          [blob],
          srtFile.name.replace(/\.srt$/, ".vtt"),
          { type: "text/vtt" }
        );

        resolve(vttFile);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsText(srtFile);
  });
}

function convertSrtToVttsContent(srtContent: string) {
  let vttContent = "WEBVTT\n\n";

  const lines = srtContent.trim().split("\n");

  let timeStampLine = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip number
    if (/^\d+$/.test(line)) {
      continue;
    }

    // Skip empty lines and subtitle numbers
    if (line === "") {
      vttContent += "\n";
      continue;
    }

    // Handle timestamp lines
    if (line.includes("-->")) {
      timeStampLine = line.replace(",", ".").replace(",", ".");
      vttContent += timeStampLine + "\n";
      continue;
    }

    // Add subtitle text
    vttContent += line + "\n";
  }

  return vttContent;
}
