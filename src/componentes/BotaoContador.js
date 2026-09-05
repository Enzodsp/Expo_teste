import { Button } from "react-native-paper";

function BotaoContador(props) {
    return (
        <Button onPress={props.onPress}>{props.children} </Button>
    )
}

export default BotaoContador;