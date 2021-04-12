import Container from '@material-ui/core/Container';
import { NavBar } from '@/components';

export default function App({ children }) {
    return (
        <>
            <NavBar/>
            <Container>
                {children}
            </Container>
        </>
    )
}