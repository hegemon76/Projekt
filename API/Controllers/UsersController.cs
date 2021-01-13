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

        
        [HttpGet("{id}/categories")]
        public ActionResult<UserCategoriesDto> GetUSerCategories(int id)
        {
            var user =  _contex.Users.Where(u => u.Id == id).Include(c => c.Categories).FirstOrDefault();
             List<string> categoryName = user.Categories.Select(cat => cat.Name).ToList();
            return new UserCategoriesDto
            {
                CategoryNames = categoryName
            };
        }

        [HttpGet("{id}/items")]
        public ActionResult<UserToDoItems> GetUSerToDoItems(int id)
        {
            Dictionary<string, string> items2 = new Dictionary<string, string>();
            var user = _contex.Users.Where(u => u.Id == id).Include(c => c.ToDoItems).ThenInclude(x => x.Category).FirstOrDefault();
           // UserToDoItems items = new UserToDoItems();
            List<string> toDoItemName = user.ToDoItems.Select(item => item.Description).ToList();
            for (int i = 0; i < toDoItemName.Count; i++)
            {
                items2.Add(user.ToDoItems.ToList(), user.Categories[i]);
            }
            return new UserToDoItems
            {
                Description = toDoItemName
            };
        }
    }
}
