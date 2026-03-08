import { useParams } from "react-router-dom";
import Registration from "../../components/Registration";

const RegistrationPage = () => {

    const { action } = useParams();

    return (
        <div>
            <Registration />
        </div>
    )
}

export default RegistrationPage;