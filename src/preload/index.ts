import { contextBridge, ipcRenderer } from 'electron';
import { IPC } from '@shared/constants/ipc';
import {
  CreateDocumentResponse,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '@shared/types/ipc';
import { DeleteDocumentRequest } from '@shared/types/ipc';

declare global {
  interface Window {
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },

  fetchDocument(request: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, request);
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
  },

  saveDocument(request: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, request);
  },

  deleteDocument(request: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, request);
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on('new-document', callback);

    return () => {
      ipcRenderer.off('new-document', callback);
    };
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
