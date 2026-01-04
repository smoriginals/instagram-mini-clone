import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "../../Context/ThemeContext";
export default function UserTheme() {

    const { toggleTheme, theme } = useTheme();

    return (
        <>
            <div className=" items-center space-x-2 flex justify-between ">
                <Label className='text-sm'>Dark Mode</Label>
                <Switch checked={theme === "dark"} onClick={toggleTheme}/>
            </div>
        </>
    )
}
