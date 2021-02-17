import User from './User';
import {useState, useEffect} from 'react'
import {CircularProgress, List, ListItem, Typography} from '@material-ui/core'
import {FormControl, TextField, Button} from '@material-ui/core'
import {reactLocalStorage} from "reactjs-localstorage";

function UserList() {
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const handleChange = e => setSearchValue(e.target.value)
    const handleClear = () => {
        setSearchValue('')
        setUsers(reactLocalStorage.getObject('users'))
    }
    const handleSearch = () => {
        if (searchValue === '') {
            setError(true)
        } else {
            let result = reactLocalStorage.getObject('users').filter(localStorageUser => searchValue.length > 1 && localStorageUser.name.includes(searchValue))
            setUsers(result)
            setError(false)
        }
    }
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK)
            .then(res => res.json())
            .then(data => {
                reactLocalStorage.setObject('users', data)
                setUsers(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])
    return (
        <div>
            <form noValidate autoComplete="off">
                <FormControl fullWidth>
                    <TextField id="search"
                               label="Search by Name or Surname"
                               helperText={error && 'Input cannot be empty' }
                               error={error}
                               value={searchValue} color="primary"
                               onChange={e => handleChange(e)}
                               InputProps={{style: {fontSize: '1.8rem'}}}
                               FormHelperTextProps={{style: {fontSize: '1rem'}}}
                               InputLabelProps={{style: {fontSize: '1.8rem'}}} />
                    <div className="buttons-container">
                        <Button size="small" variant="contained" disableElevation color="primary" onClick={() => handleSearch()}>Search</Button>
                        <Button size="small" disableElevation onClick={() => handleClear()} color="secondary">Clear</Button>
                    </div>
                </FormControl>
            </form>
            <List>
                {
                    loading ? <CircularProgress/> : users.length === 0 ?
                        <Typography variant="h4">No users found...</Typography>
                        : users.map((user, index) => (
                            <ListItem disableGutters key={user.id}><User name={user.name} username={user.username} index={index}/></ListItem>
                        ))
                }
            </List>
        </div>
    )
}

export default UserList