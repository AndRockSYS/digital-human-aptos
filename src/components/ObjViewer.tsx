// 'use client';

// import { useRef } from 'react';

// import { View } from 'react-native';
// import { WebView } from 'react-native-webview';

// export default function ObjViewer({ objLink }: { objLink: string }) {
//     const webViewRef = useRef<WebView | null>(null);

//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             <View>
//                 <WebView
//                     ref={webViewRef}
//                     source={{ uri: `https://3dviewer.net/index.html#model=${objLink}` }}
//                 />
//             </View>
//         </View>
//     );
// }
