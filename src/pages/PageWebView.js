import React, { useState, useRef } from 'react';
import { StyleSheet, View, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { SegmentedButtons, ProgressBar, Text } from 'react-native-paper';

const DOMINIOS_PERMITIDOS = [
    'ifpr.edu.br',
    'paranavai.ifpr.edu.br',
    'reactnative.dev'
];

const PAGINAS_WEB = [
    {
        key: 'ifpr',
        label: 'IFPR Reitoria',
        url: 'https://www.ifpr.edu.br',
        dominio: 'ifpr.edu.br'
    },
    {
        key: 'paranavai',
        label: 'IFPR Paranavaí',
        url: 'https://paranavai.ifpr.edu.br',
        dominio: 'paranavai.ifpr.edu.br'
    },
    {
        key: 'reactnative',
        label: 'React Native',
        url: 'https://reactnative.dev',
        dominio: 'reactnative.dev'
    }
];

export default function PageWebView({ route }) {
    const urlInicial = route?.params?.url || PAGINAS_WEB[0].url;
    const [paginaAtual, setPaginaAtual] = useState(
        PAGINAS_WEB.find(p => p.url === urlInicial)?.key || 'ifpr'
    );
    const [carregando, setCarregando] = useState(false);
    const [progresso, setProgresso] = useState(0);
    const webViewRef = useRef(null);

    const paginaSelecionada = PAGINAS_WEB.find(p => p.key === paginaAtual) || PAGINAS_WEB[0];

    const interceptarRotas = (request) => {
        const urlDestino = request.url;

        if (!urlDestino || urlDestino === 'about:blank') {
            return true;
        }

        const isPermitido = DOMINIOS_PERMITIDOS.some((dominio) => {
            try {
                const hostname = new URL(urlDestino).hostname.toLowerCase();
                return hostname === dominio || hostname.endsWith('.' + dominio);
            } catch (e) {
                return urlDestino.includes(dominio);
            }
        });

        if (isPermitido) {
            return true;
        } else {
            Linking.openURL(urlDestino).catch(() => {
                Alert.alert('Erro', 'Não foi possível abrir o link externo no navegador do dispositivo.');
            });
            return false;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text variant="titleSmall" style={styles.headerTitle}>
                    Navegação Segura de WebViews
                </Text>
                <SegmentedButtons
                    value={paginaAtual}
                    onValueChange={(val) => {
                        setPaginaAtual(val);
                    }}
                    buttons={PAGINAS_WEB.map(p => ({
                        value: p.key,
                        label: p.label,
                    }))}
                    style={styles.segmentedButtons}
                />
            </View>

            {carregando && (
                <ProgressBar progress={progresso} color="#0066cc" style={styles.progressBar} />
            )}

            <View style={styles.webViewContainer}>
                <WebView
                    ref={webViewRef}
                    key={paginaSelecionada.url}
                    source={{ uri: paginaSelecionada.url }}
                    style={styles.webView}
                    onShouldStartLoadWithRequest={interceptarRotas}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onLoadStart={() => setCarregando(true)}
                    onLoadProgress={({ nativeEvent }) => setProgresso(nativeEvent.progress)}
                    onLoadEnd={() => setCarregando(false)}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('Erro ao carregar WebView:', nativeEvent);
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        marginBottom: 6,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    segmentedButtons: {
        alignSelf: 'center',
    },
    progressBar: {
        height: 3,
    },
    webViewContainer: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
});