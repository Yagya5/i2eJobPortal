using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AuditTrails
{
    public class AuditTrail
    {
        public int AuditId { get; set; }

        public int? UserId { get; set; }

        public int? TaskId { get; set; }

        public string? OldValue { get; set; }

        public string? NewValue { get; set; }

        public string? DataField { get; set; }

        public string? Module { get; set; }

        public string? Url { get; set; }

        public String? Action { get; set; }

        public DateTime DateTimeStamp { get; set; }

    }


    public static class AuditAction
    {
        public const string Modified = "Modified", Insert = "Insert", Deleted = "Deleted";

    }

}