import { useEffect, useRef } from 'react';
import * as OV from 'online-3d-viewer';

const ObjViewer = ({ objLink }: { objLink: string }) => {
    const parentDiv = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<OV.EmbeddedViewer | null>(null);

    useEffect(() => {
        if (parentDiv.current) {
            OV.SetExternalLibLocation('libs');
            OV.Init3DViewerElements(() => {});
            if (viewerRef.current === null) {
                let viewer = new OV.EmbeddedViewer(parentDiv.current, {
                    camera: new OV.Camera(
                        new OV.Coord3D(-150.0, 200.0, 300.0),
                        new OV.Coord3D(0.0, 0.0, 0.0),
                        new OV.Coord3D(0.0, 1.0, 0.0),
                        45.0
                    ),
                    backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
                    defaultColor: new OV.RGBColor(0, 100, 100),
                    onModelLoaded: () => {
                        // @ts-ignore
                        console.log(viewerRef.current.GetViewer());
                    },
                });
                viewer.Resize = () => {
                    console.log("I'm not resizing");
                };

                let inputFiles = [new OV.InputFile('test.stl', OV.FileSource.Url, objLink)];

                viewerRef.current = viewer;

                viewer.LoadModelFromInputFiles(inputFiles);
            }
        }

        return () => {
            if (viewerRef.current !== null && parentDiv.current !== null) {
                delete viewerRef.current.model;
                viewerRef.current.viewer.renderer.resetState();
                viewerRef.current.viewer.Clear();
                // @ts-ignore
                delete viewerRef.current.viewer;
                const gl = viewerRef.current.canvas.getContext('webgl2');
                // @ts-ignore
                gl.getExtension('WEBGL_lose_context').loseContext();
                const tempClone = viewerRef.current.canvas.cloneNode(true);
                // @ts-ignore
                viewerRef.current.canvas.parentNode.replaceChild(
                    tempClone,
                    viewerRef.current.canvas
                );
                parentDiv.current.removeChild(parentDiv.current.children[0]);
                viewerRef.current = null;
            }
        };
    }, [parentDiv, viewerRef]);

    return (
        <>
            <div
                ref={parentDiv}
                role={'img'}
                aria-label='Canvas showing the model in the 3D Viewer'
                className='3d-viewer-container'
            ></div>
        </>
    );
};

export default ObjViewer;
