import React, {useState} from 'react';

function App() {
    const [repos, setRepos] = useState([]);
    const [repoName, setRepoName] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [loading, setLoading] = useState(false);

    function submitHandler(event) {
        event.preventDefault();
        setLoading(true);
        const fetchData = async () => {
            await fetch('https://api.github.com/search/repositories?q=' + repoName)
                .then(response => response.json())
                .then(data => {
                    setRepos(data.items);
                    setLoading(false);
                    if (!data.items.length) setIsEmpty(true)
                    else setIsEmpty(false);
                })
                .catch((error) => alert(error))
                .finally(() => {
                    setRepoName('');
                })
        }
        fetchData()
    }

    return (
        <>
            <h1>Поиск репозиториев по <a href="https://github.com/" className="h1">GitHub</a></h1>
            <form>
                <input placeholder="Введите название репозитория"
                       value={repoName}
                       onChange={event => setRepoName(event.target.value)}
                       autoFocus
                />
                <div>
                    <button type="submit" onClick={submitHandler}>Найти</button>
                </div>
            </form>
            <div className="listWrapper">
                {isEmpty ? <h2>По Вашему запросу репозитории не найдены</h2> : ""}
                {loading && <div className="lds-dual-ring"></div>}
                {!loading &&
                repos.map(repo =>
                    <div key={repo.id}
                         className="card">
                        <div>
                            <a className="h2" href={repo.html_url}>{repo.name}</a>
                            <h2>{repo.owner.login}</h2>
                            <div>{repo.private ? "Приватный репозиторий" : "Публичный репозиторий"}</div>
                            <div>{repo.language}</div>
                        </div>
                        <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;