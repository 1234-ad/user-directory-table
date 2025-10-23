import React, { useState, useEffect, useMemo } from 'react';
import './index.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('first_name');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users from API
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      
      if (page === 1) {
        setUsers(data.data);
      } else {
        setUsers(prev => [...prev, ...data.data]);
      }
      
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  // Load more users for pagination
  const loadMoreUsers = async () => {
    if (currentPage < totalPages) {
      await fetchUsers(currentPage + 1);
    }
  };

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterBy === 'all') return matchesSearch;
      
      if (filterBy === 'gmail') {
        return matchesSearch && user.email.includes('@gmail.com');
      }
      
      if (filterBy === 'first_letter_a') {
        return matchesSearch && user.first_name.toLowerCase().startsWith('a');
      }
      
      return matchesSearch;
    });

    // Sort users
    filtered.sort((a, b) => {
      if (sortBy === 'first_name') {
        return a.first_name.localeCompare(b.first_name);
      }
      if (sortBy === 'last_name') {
        return a.last_name.localeCompare(b.last_name);
      }
      if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

    return filtered;
  }, [users, searchTerm, sortBy, filterBy]);

  // Pagination for filtered results
  const itemsPerPage = 6;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUsers.slice(0, startIndex + itemsPerPage);
  }, [filteredAndSortedUsers, currentPage]);

  const totalFilteredPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>User Directory</h1>
        <p>Browse and search through our user database</p>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="first_name">Sort by First Name</option>
          <option value="last_name">Sort by Last Name</option>
          <option value="email">Sort by Email</option>
        </select>

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Users</option>
          <option value="gmail">Gmail Users</option>
          <option value="first_letter_a">Names starting with A</option>
        </select>
      </div>

      {loading && paginatedUsers.length === 0 ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <img 
                        src={user.avatar} 
                        alt={`${user.first_name} ${user.last_name}`}
                        className="user-avatar"
                      />
                    </td>
                    <td>
                      <div className="user-name">
                        {user.first_name} {user.last_name}
                      </div>
                    </td>
                    <td>
                      <div className="user-email">{user.email}</div>
                    </td>
                    <td>{user.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedUsers.length === 0 && !loading && (
            <div className="no-results">
              <p>No users found matching your criteria.</p>
            </div>
          )}

          {filteredAndSortedUsers.length > 0 && (
            <div className="pagination">
              <div className="pagination-info">
                Showing {paginatedUsers.length} of {filteredAndSortedUsers.length} users
              </div>
              
              {paginatedUsers.length < filteredAndSortedUsers.length && (
                <button 
                  onClick={loadMoreUsers}
                  disabled={loading || currentPage >= totalPages}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;