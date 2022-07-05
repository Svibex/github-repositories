import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [repos, setRepos] = useState()
    const [repoName, setRepoName] = useState('')
    const [fetching, setFetching] = useState(true);

    useEffect((repoName) => {
        if (repoName) {
        if (fetching) {
            fetch('https://api.github.com/search/repositories?q=' + repoName)
        .then(response => {
                return response.json();
            })
                .then(data => {
                    console.log(data.items)
                    setRepos(data.items)
                })
                .finally(() => setFetching(false))
        }
    }}, [fetching]);

    function submitHandler(event) {
        event.preventDefault();
        setRepoName('');
    }

    return (
        <>
            <form>
                <input placeholder="Введите название репозитория"
                       value={repoName}
                       onChange={event => event.target.value}
                />
                <div>
                    <button
                        type="submit"
                        onClick={submitHandler}>
                        Найти
                    </button>
                </div>
            </form>
            {!repoName ? <h2>Список репозиториев пуст...</h2> :
                <div>
                    {repos?.map(repo =>
                        !repo ? <h2>По Вашему запросу репозитории не найдены</h2> :
                        <div key={repo.id}>
                            <a href={repo.url}><h2>{repo.name}</h2></a>
                            {repo.name}
                        </div>)}
                </div>
            }
        </>
    );
}

export default App;
