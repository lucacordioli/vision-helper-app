'use client';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useKnowledge from "@/lib/hooks/useKnowledge";
import {useEffect, useState} from "react";

export default function Home() {

    const {documents,getDocumentsList, deleteDocument, uploadDocument} = useKnowledge()
    const [file, setFile] = useState<File | null>(null);
    const [docId, setDocId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDocumentsList();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleDocIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDocId(e.target.value);
    };

    const handleUpload = async () => {
        setIsLoading(true)
        if (file && docId) {
            await uploadDocument(file, docId);
            getDocumentsList(); // Aggiorna la lista dei documenti
            setFile(null);
            setDocId('');
        }
        setIsLoading(false)
    };


  return (
      <main className={"flex-col flex p-6 max-w-screen-md mx-auto"}>
          <div className={''}>
              <h1 className="text-4xl font-bold">
                  Vision helper
              </h1>

              <Card className={'my-10'}>
                  <CardHeader>
                      <CardTitle>File in db</CardTitle>
                      <CardDescription>Actual knowledge</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                                  <TableRow>
                                              <TableHead >
                                                  File name
                                              </TableHead>
                                      <TableHead >
                                          Action
                                      </TableHead>
                                  </TableRow>
                          </TableHeader>
                          <TableBody>
                              {documents.map((data, index) => (
                                      <TableRow key={index}>
                                              <TableCell >
                                                  {data}
                                              </TableCell>
                                          <TableCell>
                                              <Button onClick={() => deleteDocument(data)}>Delete</Button>
                                          </TableCell>
                                      </TableRow>
                                  ))}

                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>


              <Card className={'my-10'}>
                  <CardHeader>
                      <CardTitle>Upload file</CardTitle>
                      <CardDescription>Add file to knowledge</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Input type={'file'} onChange={handleFileChange}/>
                      <Input className={'mt-3'} type={'text'} placeholder={"File id"} value={docId} onChange={handleDocIdChange}/>
                  </CardContent>
                  <CardFooter>
                      <Button className={'mt-3 mb-4'} onClick={handleUpload} disabled={isLoading}>Upload</Button>
                  </CardFooter>
              </Card>
          </div>

      </main>
  );
}
