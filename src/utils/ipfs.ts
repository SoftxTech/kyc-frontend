import { upload } from "thirdweb/storage";
import { download } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: "67eecced480ccca94e6d6390a9c368c4",
});

export async function uploadFiles(files: File[]) {
  const uris = await upload({
    client: client,
    files: files,
  });
  const uri = String(uris);
  return uri.split("//")[1];
}

export async function downloadFile(uri: string) {
  const file = await download({
    client: client,
    uri: `ipfs://${uri}`,
  });
  return file;
}
