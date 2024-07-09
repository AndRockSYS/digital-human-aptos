import { useEffect, useState } from 'react';

enum State {
    Running,
    Stopped,
    Stopping,
}

const useImageProcessing = () => {
    const [file, setFile] = useState<File>();
    const [imageLink, setImageLink] = useState('');
    const [objLink, setObjLink] = useState('');

    useEffect(() => {
        if (!imageLink) return;
    }, [imageLink]);

    const serverInteractions = async (action: 'start' | 'stop'): Promise<string> => {
        const response = await fetch('/api/flask', {
            method: 'POST',
            body: JSON.stringify({ action }),
        });

        const json = await response.json();

        return json.message;
    };

    const imageInteractions = async (action: 'upload' | 'send'): Promise<string> => {
        if (!file) return '';
        const status = await serverStatus();
        if (status != State.Running) return '';

        const formData = new FormData();
        formData.append('action', action);
        formData.append('image', file);

        const response = await fetch('/api/flask/image', {
            method: 'POST',
            body: formData,
        });
        if (response.status != 200) return '';

        const json = await response.json();
        return json.link;
    };

    const serverStatus = async (): Promise<State> => {
        const response = await fetch('/api/flask');
        const json = await response.json();

        return json.state == 'stopping'
            ? State.Stopping
            : json.state == 'running'
            ? State.Running
            : State.Stopped;
    };

    const startServer = async (): Promise<boolean> => {
        const message = await serverInteractions('start');
        return message == 'Starting';
    };

    const stopServer = async (): Promise<boolean> => {
        const message = await serverInteractions('stop');
        return message == 'Stopping';
    };

    const uploadImage = async (): Promise<boolean> => {
        try {
            const result = await imageInteractions('upload');
            setImageLink(result);
            return result != '';
        } catch (error) {
            return false;
        }
    };

    const sendImage = async (): Promise<boolean> => {
        try {
            const result = await imageInteractions('send');
            setObjLink(result);
            return result != '';
        } catch (error) {
            return false;
        }
    };

    return { serverStatus, startServer, stopServer, setFile, uploadImage, sendImage, objLink };
};

export default useImageProcessing;
