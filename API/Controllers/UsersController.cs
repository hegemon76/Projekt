using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _contex;

        public UsersController(DataContext contex)
        {
            _contex = contex;
        }


        // api/users
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _contex.Users.ToListAsync();
        }

        // api/users/2
        // [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = _contex.Users.First(x => x.Id == id);

            return await _contex.Users.FindAsync(id);

        }


        [HttpGet("{username}/categories")]
        public ActionResult<List<UserCategoriesDto>> GetUserCategories(string username)
        {
            var user = _contex.Users.Where(u => u.UserName.ToLower() == username.ToLower())
                .Include(c => c.Categories)
                .ThenInclude(t => t.ToDoItems)
                .FirstOrDefault();

            var cats = user.Categories.Select(item =>
            new UserCategoriesDto
            {
                Category = item.Name,
                ToDos = item.ToDoItems.Count
            }).ToList();

            return cats;
        }

        [HttpGet("{id}/items")]
        public ActionResult<List<ToDoItemDto>> GetUserToDoItems(int id)
        {
            var user = _contex.Users.Where(u => u.Id == id).Include(c => c.ToDoItems).ThenInclude(x => x.Category).FirstOrDefault();

            var todos = user.ToDoItems.Select(item =>
            new ToDoItemDto
            {
                Description = item.Description,
                Category = item.Category.Name,
                Created = item.CreatedAt.ToString("f")
            }).ToList();

            return todos;
        }
    }
}
