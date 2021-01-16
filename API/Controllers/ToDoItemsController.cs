using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using API.DTOs;
using System.Security.Cryptography.X509Certificates;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ToDoItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ToDoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDoItems()
        {
            return await _context.ToDoItems.ToListAsync();
        }

        // GET: api/ToDoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            return toDoItem;
        }

        // PUT: api/ToDoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}")]
        public async Task<IActionResult> CompleteJob(int id)
        {
            var modifyItem = _context.ToDoItems.Find(id);


            if (modifyItem == null)
            {
                return BadRequest();
            }

            // _context.Entry(modifyItem).State = EntityState.Modified;


            modifyItem.IsDone = !modifyItem.IsDone;

            _context.SaveChanges();



            return Ok();
        }

        // POST: api/ToDoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDoItemCreateDto>> PostToDoItem(ToDoItemCreateDto toDoItemCreateDto)
        {
            var user = _context.Users
                .Include(c => c.Categories)
                .FirstOrDefault(x => x.UserName.ToLower() == toDoItemCreateDto.UserName.ToLower());

            var cat = user.Categories
                .FirstOrDefault(x => x.Name == toDoItemCreateDto.CategoryName);

            var item = new ToDoItem
            {
                AppUser = user,
                CategoryId = cat.Id,
                AppUserId = user.Id,
                Description = toDoItemCreateDto.Description,
                Category = cat
            };
            //TEST
            _context.ToDoItems.Add(item);

            await AddToSpecifiedUserToDoItem(user.Id, item);
            await AddToSpecifiedCategory(cat.Id, item);
            await _context.SaveChangesAsync();

            return new ToDoItemCreateDto
            {
                Description = toDoItemCreateDto.Description,
                UserName = toDoItemCreateDto.UserName,
                CategoryName = toDoItemCreateDto.CategoryName
            };
        }

        private async Task AddToSpecifiedUserToDoItem(int id, ToDoItem toDoItem)
        {
            var user = await _context.Users.Include(c => c.Categories).SingleAsync(x => x.Id == id);
            user.ToDoItems.Add(toDoItem);
            await _context.SaveChangesAsync();
        }

        private async Task AddToSpecifiedCategory(int id, ToDoItem toDoItem)
        {
            var category = await _context.Categories.Include(i => i.ToDoItems).SingleAsync(x => x.Id == id);
            category.ToDoItems.Add(toDoItem);
            await _context.SaveChangesAsync();
        }

        // DELETE: api/ToDoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(toDoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoItemExists(int id)
        {
            return _context.ToDoItems.Any(e => e.Id == id);
        }
    }
}
