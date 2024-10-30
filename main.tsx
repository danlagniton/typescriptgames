// Importing necessary libraries
import React, { useEffect, useState } from 'react';

// Defining the Game type
interface Game {
    name: string;
    img: string;
}

// Mock API function to fetch games
const fetchGames = async (): Promise<Game[]> => {
    const games: Game[] = [
        { name: 'Bad Wolf', img: './bad-wolf.webp' },
        // Add more games as needed
    ];
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(games);
        }, 3000);
    });
};

// Main App component
const App: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<Game[]>([]);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const fetchedGames = await fetchGames();
                setGames(fetchedGames);
            } catch (err) {
                setError('Failed to fetch games');
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, []);

    const toggleFavorite = (game: Game) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(game)) {
                return prevFavorites.filter((fav) => fav !== game);
            } else {
                return [...prevFavorites, game];
            }
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Game List</h1>
            <div>
                {games.map((game) => (
                    <div key={game.name}>
                        <img src={game.img} alt={game.name} />
                        <h2>{game.name}</h2>
                        <button onClick={() => toggleFavorite(game)}>
                            {favorites.includes(game) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
