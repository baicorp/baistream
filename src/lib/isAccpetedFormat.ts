export default function isAcceptedFormat(
  file: File,
  acceptedFormats: string[]
) {
  return acceptedFormats.some((format) => {
    // Handle wildcard MIME types (e.g., video/*)
    if (format.endsWith("/*")) {
      const mainType = format.split("/")[0];
      return file?.type.startsWith(mainType + "/");
    }

    // Handle file extensions
    if (format.startsWith(".")) {
      const extension = "." + file?.name?.split(".")?.pop()?.toLowerCase();
      return extension === format.toLowerCase();
    }

    // Handle exact MIME type matches
    return file?.type === format;
  });
}
