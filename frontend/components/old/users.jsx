"use client"
import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { UserContext } from "@/contexts/user-context"

export function UsersPage() {
  const { allUsers, addUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', status: 'active' });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser(prevUser => ({ ...prevUser, [id]: value }));
  };

  const handleSelectChange = (value, id) => {
    setNewUser(prevUser => ({ ...prevUser, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({ name: '', email: '', role: 'user', status: 'active' });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>View and manage all registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button 
                  key={page} 
                  onClick={() => handlePageChange(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  className="mx-1"
                >
                  {page}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Register New User</CardTitle>
            <CardDescription>Add a new user to the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter user name" 
                    value={newUser.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter user email" 
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
  <Label htmlFor="role">Role</Label>
  <Select onValueChange={(value) => handleSelectChange(value, 'role')} value={newUser.role}>
    <SelectTrigger id="role">
      <SelectValue placeholder="Select a role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="user">User</SelectItem>
    </SelectContent>
  </Select>
</div>
<div className="grid gap-2">
  <Label htmlFor="status">Status</Label>
  <Select onValueChange={(value) => handleSelectChange(value, 'status')} value={newUser.status}>
    <SelectTrigger id="status">
      <SelectValue placeholder="Select a status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="pending">Pending</SelectItem>
    </SelectContent>
  </Select>
</div>
                <Button type="submit" className="justify-self-end">
                  Register User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}