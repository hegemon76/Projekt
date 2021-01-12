﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class CategoryDto
    {
        [Required]
        public string Name { get; set; }
        public int AppUserId { get; set; }
    }
}
