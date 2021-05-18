import {environment} from "../environment";

class FileUploadService {
  deleteFile(url: string | undefined): Promise<boolean> {
    if (!url) {
      return Promise.reject();
    }
    const request = new Request(`${environment.baseUrl}file-delete`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url})
    });

    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Can't delete file`);
        }
        return true;
      })
      .catch(err => {
        // TODO add global error logger
        console.error(err);
        return false;
      })
  }
}

const fileUploadService = new FileUploadService();
export default fileUploadService;
