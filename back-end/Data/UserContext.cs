using back_end;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace back_end
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
