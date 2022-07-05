import React, {useState, useEffect} from 'react';

function App() {
    const [repos, setRepos] = useState()
    const [repoName, setRepoName] = useState('')
    const [fetching, setFetching] = useState(true);

    useEffect((repoName) => {
        // if (repoName) {
        if (fetching) {
            fetch('https://api.github.com/search/repositories?q=' + "netlify-statuskit")
        .then(response => {
                return response.json();
            })
                .then(data => {
                    console.log(data.items)
                    setRepos(data.items)
                })
                .finally(() => setFetching(false))
        }
    }
    // }
    , [fetching]);

    function submitHandler(event) {
        event.preventDefault();
        setRepoName('');
    }

    return (
        <>
            <h1>Поиск репозиториев по <a href="https://github.com/" className="h1">GitHub</a></h1>
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
                <div>
                    {repos?.map(repo =>
                        // !repo ? <h2>По Вашему запросу репозитории не найдены</h2> :
                        <div key={repo.id}
                             className="card">
                            <div>
                                <a className="h2" href={repo.url}>{repo.name}</a>
                                <h2>{repo.owner.login}</h2>
                                <div>{repo.private ? "Приватный репозиторий" : "Публичный репозиторий"}</div>
                                <div>{repo.language}</div>
                            </div>
                            <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                        </div>
                    )
                    }
                </div>
        </>
    );
}

export default App;
