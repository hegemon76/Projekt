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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoItem(int id, ToDoItem toDoItem)
        {
            if (id != toDoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(toDoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ToDoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDoItemCreateDto>> PostToDoItem(ToDoItemCreateDto toDoItemCreateDto)
        {
            var item = new ToDoItem
            {
                CategoryId = toDoItemCreateDto.CategoryId,
                AppUserId = toDoItemCreateDto.AppUserId,
                Description = toDoItemCreateDto.Description,
                Category = _context.Users.Include(c => c.Categories).Select(x => x.Categories)
            };

            _context.ToDoItems.Add(item);
            await AddToSpecifiedUserToDoItem(toDoItemCreateDto.AppUserId, item);
            await AddToSpecifiedCategory(toDoItemCreateDto.CategoryId, item);
            await _context.SaveChangesAsync();

            return new ToDoItemCreateDto
            {
                Description = toDoItemCreateDto.Description,
                AppUserId = toDoItemCreateDto.AppUserId,
                CategoryId = toDoItemCreateDto.CategoryId,
            };
        }

        private async Task AddToSpecifiedUserToDoItem(int id, ToDoItem toDoItem)
        {
            var user = await _context.Users.SingleAsync(x => x.Id == id);
            user.ToDoItems.Add(toDoItem);
            await _context.SaveChangesAsync();
        }

        private async Task AddToSpecifiedCategory(int id, ToDoItem toDoItem)
        {
            var category = await _context.Categories.SingleAsync(x => x.Id == id);
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
