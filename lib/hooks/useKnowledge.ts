import {useState} from "react";

const BACKEND_BASE_URL = 'http://127.0.0.1:8000';

const useKnowledge = () => {
    const [documents, setDocuments] = useState([]);

    const getDocumentsList = async () => {
        const response = await fetch(BACKEND_BASE_URL + '/documents');
        const data = await response.json();
        console.log(data)
        setDocuments(data);
    }

    const uploadDocument = async (file: File, docId: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc_id', docId);

        const response = await fetch(BACKEND_BASE_URL + '/add-document', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Document uploaded successfully');
            getDocumentsList();
        } else {
            console.error('Error uploading document');
        }
    }

    const deleteDocument = async (docId: string) => {
        const response = await fetch(`${BACKEND_BASE_URL}/delete-document/?doc_id=${docId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Document deleted successfully');
            getDocumentsList();
        } else {
            console.error('Error deleting document');
        }
    }

    return {
        documents,
        getDocumentsList,
        uploadDocument,
        deleteDocument,

    }

}

export default useKnowledge;
