using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
            var user = _contex.Users.Where(u => u.Id == id).Include(c => c.Categories).FirstOrDefault();
            List<string> categoryName = user.Categories.Select(cat => cat.Name).ToList();
            return new UserCategoriesDto
            {
                CategoryNames = categoryName
            };
            //return await _contex.Users.Include(c => c.Categories).Where(u => u.Id == id).ToListAsync();
        }
    }
}
