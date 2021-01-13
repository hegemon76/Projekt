using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;

namespace API.DTOs
{
    public class UserToDoItems
    {
        public List<string> Description { get; set; }
    }
}
