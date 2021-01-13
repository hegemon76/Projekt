using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ToDoItemCreateDto
    {
        public int CategoryId { get; set; }
        public int AppUserId { get; set; }
        public string Description { get; set; }
    }
}
