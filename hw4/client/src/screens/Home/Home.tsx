import {
  Card,
  Container,
  CardActionArea,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core"
import { Link } from "react-router-dom"

export default function Home() { 
  return (
    <Container> 
        <Typography>
          Hello this is home
        </Typography> 
        <Link to="/userReservations">
            <Button>
                  go to userReservations
            </Button>
        </Link>
    </Container>
  )
}
