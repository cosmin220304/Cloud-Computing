import {
  Card,
  Container,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import Logo from "../../components/common/Logo";

interface IProps {
  setGoToLogin: Function;
}

export default function Home({ setGoToLogin }: IProps) {
  const goToLogin = () => {
    setGoToLogin(true);
  };

  return (
    <Container>
      <div className="center-children p-t-5">
        <Logo />

        <Card className="w-20 m-b-2 center-text">
          <CardActionArea onClick={goToLogin}>
            <CardContent>
              <Typography>Sign in with phone number</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Typography className="bold italic" onClick={goToLogin}>
          New here? Create an account!
        </Typography>
      </div>
    </Container>
  );
}
