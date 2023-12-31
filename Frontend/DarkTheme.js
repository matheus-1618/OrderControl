import DefaultTheme from './DefaultTheme';

export default {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
        primary: '#2385A2',
        accent: '#2385A2',
        background: '#121212',
        surface: '#121212',
        card: 'rgb(18, 18, 18)',
        error: '#CF6679',
        text: '#ffffff',
        disabled: 'rgba(255, 255, 255, 0.38)',
        placeholder: 'rgba(255, 255, 255, 0.54)',
        border: 'rgb(39, 39, 41)',
        backdrop: 'rgba(0, 0, 0, 0.5)',
        onSurface: '#FFFFFF',
        notification: '#ff80ab',
    },
    screenOptions: {
        headerStyle: {
            backgroundColor: '#2385A2',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
            color: '#000000',
        },
    },
};
