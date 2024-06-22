import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomeUser from "../pages/HomeUser";
import VagasAllUser from "../pages/VagasAllUser"
import HomeRecruiter from "../pages/HomeRecruiter";
import CreateVagasAdmin from "../pages/CreateVagasAdmin";
import VagasAdmin from "../pages/VagasAdmin";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeUser"
        component={HomeUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VagasAllUser"
        component={VagasAllUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeRecruiter"
        component={HomeRecruiter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateVagasAdmin"
        component={CreateVagasAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VagasAdmin"
        component={VagasAdmin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
