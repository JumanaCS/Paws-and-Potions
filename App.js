import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import GameScreen from "./src/screens/GameScreen";
import ReuseableGame from "./src/components/ReuseableGame";
import ReuseableCombat from "./src/components/ReuseableCombat";
import RulesScreen from "./src/screens/RulesScreen";
{/*import Flash from "./src/screens/Flash";*/}

const navigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Game: GameScreen,
    GameComp: ReuseableGame,
    CombatComp: ReuseableCombat,
    Rules: RulesScreen,
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      title: "App",
      headerShown: false
    },
  }
);

    {/*Review: MidtermReview,
    One: Screen1,
    Two: Screen2,
    Three2: Screen3,
    Four: Screen4,
    Five: Screen5,
    Flashcards: Flash,*/}

export default createAppContainer(navigator);
