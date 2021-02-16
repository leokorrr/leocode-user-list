import User from './User';
import {useState, useEffect} from 'react'
import {List, ListItem, Typography} from '@material-ui/core'
import {FormControl, TextField, Button} from '@material-ui/core'

function UserList() {
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const fetchUsers = () => {
        let query
        searchValue === '' ? query = '' : query = `?name=${searchValue}`
        fetch(`https://jsonplaceholder.typicode.com/users${query}`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }
    const handleSearch = () => {
        fetchUsers()
    }
    const handleClear = () => {
        setSearchValue('')
        fetchUsers()
    }
    useEffect(() => {
        if (searchValue === '') fetchUsers()
    }, [searchValue])
    return (
        <div>
            <form noValidate autoComplete="off">
                <FormControl fullWidth>
                    <TextField id="search" label="Search by Name Surname" value={searchValue} color="primary" onChange={e => setSearchValue(e.target.value)} inputProps={{style: {fontSize: '1.8rem'}}} InputLabelProps={{style: {fontSize: '1.8rem'}}} />
                    <div className="buttons-container">
                        <Button size="small" variant="contained" disableElevation color="primary" onClick={() => handleSearch()}>Search</Button>
                        <Button size="small" disableElevation color="secondary" onClick={() => handleClear()}>Clear</Button>
                    </div>
                </FormControl>
            </form>
            <List component="nav">
                {users.length === 0 ? <Typography variant="h4">No users found...</Typography> : users.map((user, index) => (<ListItem key={user.id}><User name={user.name} username={user.username} index={index}/></ListItem>))}
            </List>
        </div>
    )
}

export default UserList