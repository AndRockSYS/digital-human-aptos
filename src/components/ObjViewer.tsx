import { useEffect, useRef } from 'react';
import * as OV from 'online-3d-viewer';

export default function ObjViewer({ file }: { file: File }) {
    const parentDiv = useRef<HTMLDivElement | null>(null);
    const viewerRef = useRef<OV.EmbeddedViewer | null>(null);

    useEffect(() => {
        window.addEventListener('load', () => {
            if (!parentDiv.current) return;
            OV.SetExternalLibLocation('libs');

            let viewer = new OV.EmbeddedViewer(parentDiv.current, {
                camera: new OV.Camera(
                    new OV.Coord3D(-1.5, 2.0, 3.0),
                    new OV.Coord3D(0.0, 0.0, 0.0),
                    new OV.Coord3D(0.0, 1.0, 0.0),
                    45.0
                ),
                backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
                defaultColor: new OV.RGBColor(200, 200, 200),
                edgeSettings: new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1),
                environmentSettings: new OV.EnvironmentSettings(
                    [
                        'assets/envmaps/fishermans_bastion/posx.jpg',
                        'assets/envmaps/fishermans_bastion/negx.jpg',
                        'assets/envmaps/fishermans_bastion/posy.jpg',
                        'assets/envmaps/fishermans_bastion/negy.jpg',
                        'assets/envmaps/fishermans_bastion/posz.jpg',
                        'assets/envmaps/fishermans_bastion/negz.jpg',
                    ],
                    false
                ),
            });

            viewer.LoadModelFromFileList([file]);
        });

        return window.removeEventListener('load', () => {});
    }, [parentDiv]);

    return (
        <>
            <div
                ref={parentDiv}
                role={'img'}
                aria-label='Canvas showing the model in the 3D Viewer'
                className='obj-container'
            ></div>
        </>
    );
}
