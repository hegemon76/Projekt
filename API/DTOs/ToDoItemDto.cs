using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace API.DTOs
{
    public class ToDoItemDto
    {
        public string Description { get; set; }
        public string Category { get; set; }
        public string Created { get; set; }
    }
}
