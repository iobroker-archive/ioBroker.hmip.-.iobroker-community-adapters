// this file used only for simulation and not used in end build

import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { Box } from '@mui/material';

import { GenericApp, I18n, Loader } from '@iobroker/adapter-react-v5';

import HmipComponent from './HmipComponent';

import enLang from './i18n/en.json';
import deLang from './i18n/de.json';
import ruLang from './i18n/ru.json';
import ptLang from './i18n/pt.json';
import nlLang from './i18n/nl.json';
import frLang from './i18n/fr.json';
import itLang from './i18n/it.json';
import esLang from './i18n/es.json';
import plLang from './i18n/pl.json';
import ukLang from './i18n/uk.json';
import zhLang from './i18n/zh-cn';

const styles = {
    app: theme => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100%',
    }),
    item: {
        padding: 50,
        width: 400,
    },
};

class App extends GenericApp {
    constructor(props) {
        const extendedProps = { ...props };
        super(props, extendedProps);

        this.state = {
            data: { myCustomAttribute: 'red' },
            theme: this.createTheme(),
        };
        const translations = {
            en: enLang,
            de: deLang,
            ru: ruLang,
            pt: ptLang,
            nl: nlLang,
            fr: frLang,
            it: itLang,
            es: esLang,
            pl: plLang,
            uk: ukLang,
            'zh-cn': zhLang,
        };

        I18n.setTranslations(translations);
        I18n.setLanguage((navigator.language || navigator.userLanguage || 'en').substring(0, 2).toLowerCase());
    }

    render() {
        if (!this.state.loaded) {
            return (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={this.state.theme}>
                        <Loader themeType={this.state.themeType} />
                    </ThemeProvider>
                </StyledEngineProvider>
            );
        }

        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <Box sx={styles.app}>
                        <div style={styles.item}>
                            <HmipComponent
                                oContext={{
                                    socket: this.socket,
                                    themeType: this.state.themeType,
                                }}
                                alive
                                changed={false}
                                themeName={this.state.themeName}
                                attr="myCustomAttribute"
                                common={{}}
                                originalData={this.state.data}
                                data={this.state.data}
                                onError={() => {}}
                                instance={0}
                                schema={{
                                    name: 'ConfigCustomHmipSet/Components/HmipComponent',
                                    type: 'custom',
                                }}
                                onChange={data => this.setState({ data })}
                            />
                        </div>
                    </Box>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default App;
