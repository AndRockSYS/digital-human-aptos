interface DigitalId {
    name: string;
    digitalIdAddress: string;
    faceIpfsHash: string;
    irisAddress?: string;
    fingerprintAddress?: string;
}

enum State {
    Running,
    Stopped,
    Stopping,
}
