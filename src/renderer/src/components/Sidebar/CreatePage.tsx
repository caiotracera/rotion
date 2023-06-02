import { useMutation } from '@tanstack/react-query';
import { Plus } from 'phosphor-react';

import { Document } from '@/shared/types/ipc';

import { queryClient } from '../../lib/react-query';

export function CreatePage() {
  const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument();

        return response.data;
      },
      {
        onSuccess: (data) => {
          queryClient.setQueriesData<Document[]>(['documents'], (documents) => {
            if (documents && documents.length >= 0) {
              return [...documents, data];
            } else {
              [data];
            }
          });
        },
      },
    );

  return (
    <button
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
      disabled={isCreatingNewDocument}
      onClick={() => createDocument()}
    >
      <Plus className="h-4 w-4" />
      Criar novo documento
    </button>
  );
}
