using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LagerHantering.Models
{
    public class Receipt
    {
        public int Id { get; set; }
        public string Component { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public string User { get; set; }
    }
}