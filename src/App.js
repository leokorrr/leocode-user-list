import './App.scss';
import UsersList from './components/UsersList'
import {Container, Typography} from '@material-ui/core'

function App() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h2" align="center">Users list</Typography>
            <UsersList />
        </Container>
    )
}

export default App;
