import { upload } from "thirdweb/storage";
import { download } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.CLIENTID || "67eecced480ccca94e6d6390a9c368c4",
});

export async function uploadFiles(files: File[]) {
  const uris = await upload({
    client: client,
    files: files,
  });

  console.log(uris);
}

export async function downloadFile(uri: string) {
  const file = await download({
    client: client,
    uri: `ipfs://${uri}`,
  });
  console.log(file);
  return file;
}
